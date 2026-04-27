package com.budgetIt.budgetIt.dtos.responses;

import com.budgetIt.budgetIt.data.models.Inflow;
import com.budgetIt.budgetIt.data.models.Outflow;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FullDashboardResponse {
    private String name;
    private List<Inflow> inflows;
    private List<Outflow> outflows;

    private double totalInflow;
    private double totalOutflow;
    private double balance;
}
