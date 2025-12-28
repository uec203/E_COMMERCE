package com.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.model.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
