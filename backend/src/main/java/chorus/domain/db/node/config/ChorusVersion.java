package chorus.domain.db.node.config;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class ChorusVersion {

	@Id
    private String version;

}
