package in.amar.billingsoftware.service;

import in.amar.billingsoftware.io.UserRequest;
import in.amar.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest request);

    String getUserRole(String email);

    List<UserResponse> readUsers();

    void deleteUser(String id);
}
