package chorus.domain.db.entity.config;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class ChorusVersion implements Serializable {

    @Id
    private String version;

}
