package com.budgetIt.budgetIt.services;

import com.budgetIt.budgetIt.data.models.Inflow;
import com.budgetIt.budgetIt.data.models.Outflow;
import com.budgetIt.budgetIt.data.models.User;
import com.budgetIt.budgetIt.data.repositories.InflowRepository;
import com.budgetIt.budgetIt.data.repositories.OutflowRepository;
import com.budgetIt.budgetIt.data.repositories.UserRepository;
import com.budgetIt.budgetIt.dtos.requests.DeleteRequest;
import com.budgetIt.budgetIt.dtos.requests.InflowRequest;
import com.budgetIt.budgetIt.dtos.requests.OutflowRequest;
import com.budgetIt.budgetIt.dtos.responses.DashboardResponse;
import com.budgetIt.budgetIt.dtos.responses.FullDashboardResponse;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class FinanceServiceImpl implements FinanceService {

    private final UserRepository userRepository;
    private final InflowRepository inflowRepository;
    private final OutflowRepository outflowRepository;

    public FinanceServiceImpl(UserRepository userRepository,
                              InflowRepository inflowRepository,
                              OutflowRepository outflowRepository) {
        this.userRepository = userRepository;
        this.inflowRepository = inflowRepository;
        this.outflowRepository = outflowRepository;
    }

    @Override
    public void addInflow(InflowRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Inflow inflow = new Inflow();
        inflow.setName(request.getName());
        inflow.setAmount(request.getAmount());
        inflow.setType(request.getType());
        inflow.setDate(LocalDateTime.now());
        inflow.setUser(user);

        inflowRepository.save(inflow);
    }

    @Override
    public void addOutflow(OutflowRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Outflow outflow = new Outflow();
        outflow.setName(request.getName());
        outflow.setAmount(request.getAmount());
        outflow.setType(request.getType());
        outflow.setDate(LocalDateTime.now());
        outflow.setUser(user);

        outflowRepository.save(outflow);
    }

    @Override
    public DashboardResponse getDashboard(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Inflow> inflows = inflowRepository.findByUser(user);
        List<Outflow> outflows = outflowRepository.findByUser(user);

        BigDecimal totalInflow = inflows.stream()
                .map(Inflow::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalOutflow = outflows.stream()
                .map(Outflow::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal balance = totalInflow.subtract(totalOutflow);

        DashboardResponse response = new DashboardResponse();
        response.setTotalInflow(totalInflow);
        response.setTotalOutflow(totalOutflow);
        response.setBalance(balance);

        return response;
    }

    @Override
    public FullDashboardResponse getFullDashboard(String email) {

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        List<Inflow> inflows = inflowRepository.findByUser(user);
        List<Outflow> outflows = outflowRepository.findByUser(user);

        double totalInflow = inflows.stream()
                .map(Inflow::getAmount)
                .filter(Objects::nonNull)
                .mapToDouble(BigDecimal::doubleValue)
                .sum();

        double totalOutflow = outflows.stream()
                .map(Outflow::getAmount)
                .filter(Objects::nonNull)
                .mapToDouble(BigDecimal::doubleValue)
                .sum();

        double balance = totalInflow - totalOutflow;

        FullDashboardResponse response = new FullDashboardResponse();
        response.setName(user.getName());
        response.setInflows(inflows);
        response.setOutflows(outflows);
        response.setTotalInflow(totalInflow);
        response.setTotalOutflow(totalOutflow);
        response.setBalance(balance);

        return response;
    }

    @Override
    public void deleteInflow(DeleteRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Inflow inflow = inflowRepository.findById(request.getId())
                .orElseThrow(() -> new RuntimeException("inflow not found"));

        if (!inflow.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized action");
        }
        inflowRepository.delete(inflow);
    }

    @Override
    public void deleteOutflow(DeleteRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        Outflow outflow = outflowRepository.findById(request.getId())
                .orElseThrow(() -> new RuntimeException("Outflow not found"));

        if (!outflow.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized action");
        }
        outflowRepository.delete(outflow);

    }
}