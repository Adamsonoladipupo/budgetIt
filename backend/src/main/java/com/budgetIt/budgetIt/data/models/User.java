package com.budgetIt.budgetIt.data.models;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Inflow> inflows;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Outflow> outflows;
    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}