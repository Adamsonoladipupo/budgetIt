package com.budgetIt.budgetIt.services;


import com.budgetIt.budgetIt.data.models.User;
import com.budgetIt.budgetIt.data.repositories.UserRepository;
import com.budgetIt.budgetIt.dtos.requests.LoginRequest;
import com.budgetIt.budgetIt.dtos.requests.UserRequestRegistrationDTO;
import com.budgetIt.budgetIt.dtos.responses.LoginResponse;
import com.budgetIt.budgetIt.dtos.responses.UserResponseRegistrationDTO;
import com.budgetIt.budgetIt.exceptions.IncorrectPasswordExceptions;
import com.budgetIt.budgetIt.exceptions.UserAlreadyExistExceptions;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseRegistrationDTO registerUser(UserRequestRegistrationDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistExceptions("User already exists");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        UserResponseRegistrationDTO response = new UserResponseRegistrationDTO();
        response.setName(user.getName());
        response.setEmail(user.getEmail());

        return response;
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());

        if (user == null) throw new RuntimeException("User not found");

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IncorrectPasswordExceptions("Wrong password");
        }

        LoginResponse response = new LoginResponse();
        response.setName(user.getName());
        response.setEmail(user.getEmail());

        return response;
    }
}