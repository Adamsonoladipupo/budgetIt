package com.budgetIt.budgetIt.controllers;

import com.budgetIt.budgetIt.dtos.requests.DeleteRequest;
import com.budgetIt.budgetIt.dtos.requests.InflowRequest;
import com.budgetIt.budgetIt.dtos.requests.OutflowRequest;
import com.budgetIt.budgetIt.dtos.responses.DashboardResponse;
import com.budgetIt.budgetIt.dtos.responses.FullDashboardResponse;
import com.budgetIt.budgetIt.services.FinanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://budgetit-2p8g.onrender.com")
@RestController
@RequestMapping("/api/finance")
public class FinanceController {

    private final FinanceService financeService;

    public FinanceController(FinanceService financeService) {
        this.financeService = financeService;
    }

    @PostMapping("/inflow")
    public ResponseEntity<String> addInflow(@RequestBody InflowRequest request) {
        financeService.addInflow(request);
        return ResponseEntity.ok("Inflow added");
    }

    @PostMapping("/outflow")
    public ResponseEntity<String> addOutflow(@RequestBody OutflowRequest request) {
        financeService.addOutflow(request);
        return ResponseEntity.ok("Outflow added");
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboard(@RequestParam String email) {
        return ResponseEntity.ok(financeService.getDashboard(email));
    }

    @GetMapping("/dashboard/full")
    public ResponseEntity<FullDashboardResponse> getFullDashboard(
            @RequestParam String email) {
        return ResponseEntity.ok(financeService.getFullDashboard(email));
    }

    @DeleteMapping("/inflow/{id}")
    public ResponseEntity<?> deleteInflow(@RequestParam String email, @PathVariable Long id) {
        DeleteRequest request = new DeleteRequest(email, id);
        financeService.deleteInflow(request);
        return ResponseEntity.ok("Inflow deleted successfully");
    }

    @DeleteMapping("/outflow/{id}")
    public ResponseEntity<?> deleteOutflow(@RequestParam String email, @PathVariable Long id) {
        DeleteRequest request = new DeleteRequest(email, id);
        financeService.deleteOutflow(request);
        return ResponseEntity.ok("Outflow deleted successfully");
    }
}
