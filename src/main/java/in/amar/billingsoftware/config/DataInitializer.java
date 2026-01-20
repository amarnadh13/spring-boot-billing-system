package in.amar.billingsoftware.config;


import in.amar.billingsoftware.entity.UserEntity;
import in.amar.billingsoftware.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            UserEntity admin = UserEntity.builder()
                    .userId("admin")
                    .email("amar@example.com")
                    .password(passwordEncoder.encode("amar12345"))
                    .role("ROLE_ADMIN")
                    .name("Administrator")
                    .build();

            userRepository.save(admin);
            System.out.println("Initial admin has been created");
        }
    }
}
