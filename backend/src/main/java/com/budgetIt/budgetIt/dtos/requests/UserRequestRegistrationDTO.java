package com.budgetIt.budgetIt.dtos.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestRegistrationDTO {
    private String name;
    private String email;
    private String password;
}
