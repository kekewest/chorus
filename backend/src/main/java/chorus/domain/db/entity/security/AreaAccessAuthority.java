package chorus.domain.db.entity.security;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import chorus.domain.db.entity.contents.Area;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@IdClass(AreaAccessAuthority.PK.class)
@EqualsAndHashCode(exclude = { "area" })
@ToString(exclude = { "area" })
@Data
public class AreaAccessAuthority implements Serializable {

    @Id
    private String userName;

    @Id
    private String areaName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "areaName", referencedColumnName = "name", insertable = false, updatable = false)
    private Area area;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class PK implements Serializable {

        private String userName;

        private String areaName;
    }

}
