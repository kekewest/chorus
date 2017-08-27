package chorus.domain.db.node.files;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Area {

    @Id
    private String name;



}
