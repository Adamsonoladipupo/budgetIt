package com.budgetIt.budgetIt.dtos.responses;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class DashboardResponse {
    private BigDecimal totalInflow;
    private BigDecimal totalOutflow;
    private BigDecimal balance;
}
