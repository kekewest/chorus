package chorus.domain.db.entity.security;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import chorus.domain.db.entity.contents.Area;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@IdClass(AreaAccessAuthority.PK.class)
@EqualsAndHashCode(exclude = { "area" })
@Data
public class AreaAccessAuthority implements Serializable {

    @Id
    private String userName;

    @Id
    private String areaName;

    @ManyToOne
    @JoinColumn(name = "areaName", referencedColumnName = "name", insertable = false, updatable = false)
    private Area area;

    @Data
    public static class PK implements Serializable {

        private String userName;

        private String areaName;
    }

}
