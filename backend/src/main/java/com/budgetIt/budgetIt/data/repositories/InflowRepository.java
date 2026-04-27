package com.budgetIt.budgetIt.data.repositories;

import com.budgetIt.budgetIt.data.models.Inflow;
import com.budgetIt.budgetIt.data.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InflowRepository extends JpaRepository<Inflow, Long> {
    List<Inflow> findByUser(User user);
    void deleteById(Long id);

}