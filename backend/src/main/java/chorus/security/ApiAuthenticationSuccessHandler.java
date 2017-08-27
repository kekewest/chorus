package chorus.security;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class ApiAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private ObjectWriter writer;

    public ApiAuthenticationSuccessHandler() {
        ObjectMapper mapper = new ObjectMapper();
        writer = mapper.writerFor(LoggedIn.class);
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        response.setStatus(HttpStatus.OK.value());

        LoggedIn loggedIn = LoggedIn.builder()
                .active(authentication.isAuthenticated())
                .authorities(
                        authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .build();

        response.getWriter().print(writer.writeValueAsString(loggedIn));
    }

}
