package chorus.security;

import java.io.Serializable;

import lombok.Data;

@Data
public class Login implements Serializable {

    private String userName;

    private String password;

}
