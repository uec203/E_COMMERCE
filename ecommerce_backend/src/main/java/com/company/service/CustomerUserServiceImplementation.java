package com.company.service;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.company.model.User;
import com.company.repository.UserRepository;

@Service
public class CustomerUserServiceImplementation implements UserDetailsService{

	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	
    private final String ADMIN_USERNAME = "admin@example.com";
    private final String ADMIN_PASSWORD_HASH;


	public CustomerUserServiceImplementation(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.ADMIN_PASSWORD_HASH = this.passwordEncoder.encode("admin");
	}




	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
        if (username.equals(ADMIN_USERNAME)) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(ADMIN_USERNAME)
                    .password(ADMIN_PASSWORD_HASH)
                    .roles("ADMIN")
                    .build();
        }
		
		User user = userRepository.findByEmail(username);
		if(user==null) throw new UsernameNotFoundException("Username Not Found with email:"+username);
		
		List<GrantedAuthority> authorities =
		        AuthorityUtils.createAuthorityList("ROLE_" + user.getRole());
		
		return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
	}

}
