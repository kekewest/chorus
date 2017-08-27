package chorus.domain.db.node.security;

import java.util.HashSet;
import java.util.Set;

import lombok.Data;
import lombok.EqualsAndHashCode;

import org.neo4j.ogm.annotation.GraphId;
import org.neo4j.ogm.annotation.Index;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

import chorus.security.AuthorityType;

@EqualsAndHashCode(of = {"authorityType"})
@Data
@NodeEntity
public class Authority {

    @GraphId
    private Long id;

    @Index(primary = true, unique = true)
    private AuthorityType authorityType;

    @Relationship(type = "Authority", direction = Relationship.INCOMING)
    private Set<User> users;

    public void addUsers(User... us) {
        if (users == null) {
            users = new HashSet<>();
        }
        for (User u : us) {
            if (u == null || users.contains(u)) {
                continue;
            }
            users.add(u);
            u.addAuthorities(this);
        }
    }

}
