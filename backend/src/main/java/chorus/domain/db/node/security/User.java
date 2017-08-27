package chorus.domain.db.node.security;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import chorus.domain.db.node.files.Area;

@EqualsAndHashCode(of = {"name"})
@Data
@NodeEntity
public class User {

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private String name;

    private String password;

    @Relationship(type = "Authority", direction = Relationship.OUTGOING)
    private Set<Authority> authorities;

    @Relationship(type = "Member", direction = Relationship.OUTGOING)
    private Set<Area> areas;

    public void addAuthorities(Authority... as) {
        if (authorities == null) {
            authorities = new HashSet<>();
        }
        for (Authority a : as) {
            if (a == null || authorities.contains(a)) {
                continue;
            }
            authorities.add(a);
            a.addUsers(this);
        }
    }

    public void addAreas(Area... as) {
        if (areas == null) {
            areas = new HashSet<>();
        }
        for (Area a : as) {
            if (a == null || areas.contains(a)) {
                continue;
            }
            areas.add(a);
            a.addUsers(this);
        }
    }

}
