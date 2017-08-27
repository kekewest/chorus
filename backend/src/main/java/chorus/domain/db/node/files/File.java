package chorus.domain.db.node.files;

import javax.persistence.Entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(of = {}, callSuper = true)
@Data
@Entity
public class File extends Node {

    private String persistenceLocation;

}
