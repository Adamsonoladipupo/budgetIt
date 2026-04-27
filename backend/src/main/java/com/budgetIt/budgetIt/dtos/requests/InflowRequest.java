package com.budgetIt.budgetIt.dtos.requests;

import com.budgetIt.budgetIt.data.models.InflowType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class InflowRequest {
    private String email;
    private String name;
    private BigDecimal amount;
    private InflowType type;
}
