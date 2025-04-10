package com.ptt.mini_project.backend.services;

import com.ptt.mini_project.backend.entities.Item;
import com.ptt.mini_project.backend.entities.Order;
import com.ptt.mini_project.backend.entities.OrderItem;
import com.ptt.mini_project.backend.exceptions.ResourceNotFoundException;
import com.ptt.mini_project.backend.repositories.ItemsRepository;
import com.ptt.mini_project.backend.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ItemsRepository itemsRepository;

    public Order postNewOrder(Order order) {

        order.setTotalPrice(computeTotalPrice(order.getOrderItems()));

        return orderRepository.save(order);
    }

    private Double computeTotalPrice(List<OrderItem> orderItems) {
        return orderItems.stream()
                .mapToDouble(item -> {
                    Double price = getPriceOfItem(item.getItemName());  // Fetch price
                    return (price != null) ? price * item.getQuantity() : 0.0; // Handle null case
                })
                .sum();  // Sum up all item prices
    }
    private Double getPriceOfItem(String item) {

        Item itemExtracted = itemsRepository.findByItemContainingIgnoreCase(item)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id : " + item));
        return itemExtracted.getPrice();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id : " + id));
    }

    public boolean markOrderCompletedById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id : " + id));

        order.setIsFinalized(false);
        order.setIsCompleted(true);
        orderRepository.save(order);
        return true;
    }

    public List<Order> getAllFinalizedOrders() {
        return orderRepository.findAllByIsFinalizedIsTrue();
    }

    public List<Order> getAllCompletedOrders() {
        return orderRepository.findAllByIsCompletedTrue();
    }
}
