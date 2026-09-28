package com.globalnex.dto.auth;

import com.globalnex.model.AdminUser;
import com.globalnex.model.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String name;
    private String email;
    private UserRole role;
    private LocalDateTime lastLoginAt;

    public static UserResponse fromEntity(AdminUser user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .lastLoginAt(user.getLastLoginAt())
                .build();
    }
}
