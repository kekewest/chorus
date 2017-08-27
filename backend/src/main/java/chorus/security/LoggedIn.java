package chorus.security;

import java.io.Serializable;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoggedIn implements Serializable {

    private boolean active;

    private List<String> authorities;

}
