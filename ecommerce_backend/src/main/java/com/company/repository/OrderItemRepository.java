package com.company.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.company.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

}
