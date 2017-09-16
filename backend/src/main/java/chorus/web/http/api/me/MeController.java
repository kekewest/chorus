package chorus.web.http.api.me;

import java.util.ArrayList;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/me")
public class MeController {

    @GetMapping("/status")
    public MeStatus status(Authentication authentication) {
        if (authentication == null) {
            return MeStatus.builder()
                    .active(false)
                    .authorities(new ArrayList<>())
                    .build();
        }

        return MeStatus.builder()
                .active(authentication.isAuthenticated())
                .authorities(
                        authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .build();
    }

}
