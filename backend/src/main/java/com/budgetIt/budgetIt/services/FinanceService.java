package com.budgetIt.budgetIt.services;

import com.budgetIt.budgetIt.dtos.requests.DeleteRequest;
import com.budgetIt.budgetIt.dtos.requests.InflowRequest;
import com.budgetIt.budgetIt.dtos.requests.OutflowRequest;
import com.budgetIt.budgetIt.dtos.responses.DashboardResponse;
import com.budgetIt.budgetIt.dtos.responses.FullDashboardResponse;

public interface FinanceService {
    void addInflow(InflowRequest request);
    void addOutflow(OutflowRequest request);
    DashboardResponse getDashboard(String email);
    FullDashboardResponse getFullDashboard(String email);
    void deleteInflow(DeleteRequest request);
    void deleteOutflow(DeleteRequest request);
}
