package com.budgetIt.budgetIt.controllers;

import com.budgetIt.budgetIt.dtos.requests.LoginRequest;
import com.budgetIt.budgetIt.dtos.requests.UserRequestRegistrationDTO;
import com.budgetIt.budgetIt.dtos.responses.LoginResponse;
import com.budgetIt.budgetIt.dtos.responses.UserResponseRegistrationDTO;
import com.budgetIt.budgetIt.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://budgetit-2p8g.onrender.com")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseRegistrationDTO> register(@RequestBody UserRequestRegistrationDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.registerUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }
}