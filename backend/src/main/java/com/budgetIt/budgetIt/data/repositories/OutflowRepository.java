package com.budgetIt.budgetIt.data.repositories;

import com.budgetIt.budgetIt.data.models.Outflow;
import com.budgetIt.budgetIt.data.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OutflowRepository extends JpaRepository<Outflow, Long> {
    List<Outflow> findByUser(User user);
    void deleteById(Long id);
}