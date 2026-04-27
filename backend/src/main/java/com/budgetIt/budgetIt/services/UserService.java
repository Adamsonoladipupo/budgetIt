package com.budgetIt.budgetIt.services;

import com.budgetIt.budgetIt.dtos.requests.LoginRequest;
import com.budgetIt.budgetIt.dtos.requests.UserRequestRegistrationDTO;
import com.budgetIt.budgetIt.dtos.responses.LoginResponse;
import com.budgetIt.budgetIt.dtos.responses.UserResponseRegistrationDTO;
import org.springframework.stereotype.Service;


public interface UserService {
    UserResponseRegistrationDTO registerUser(UserRequestRegistrationDTO request);
    LoginResponse login(LoginRequest request);
}
