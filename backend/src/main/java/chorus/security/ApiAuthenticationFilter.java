package chorus.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

public class ApiAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    private ObjectReader jsonReader;

    public ApiAuthenticationFilter() {
        super("/api/login");

        ObjectMapper mapper = new ObjectMapper();
        jsonReader = mapper.readerFor(Login.class);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException, ServletException {

        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException(
                    "Authentication method not supported: " + request.getMethod());
        }

        Login login;
        try {
            login = jsonReader.readValue(request.getReader());
        } catch (Exception e) {
            throw new AuthenticationServiceException("JSON parse failed.", e);
        }

        if (login.getUserName() == null) {
            login.setUserName("");
        }

        if (login.getPassword() == null) {
            login.setPassword("");
        }

        login.setUserName(login.getUserName().trim());

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                login.getUserName(), login.getPassword());


        return getAuthenticationManager().authenticate(authRequest);
    }


}
