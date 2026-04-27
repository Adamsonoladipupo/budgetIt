package com.budgetIt.budgetIt.dtos.requests;

import com.budgetIt.budgetIt.data.models.OutflowType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class OutflowRequest {
    private String email;
    private String name;
    private BigDecimal amount;
    private OutflowType type;
}
