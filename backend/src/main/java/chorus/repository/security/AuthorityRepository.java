package chorus.repository.security;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import chorus.domain.db.node.security.Authority;
import chorus.security.AuthorityType;

public interface AuthorityRepository extends Neo4jRepository<Authority, Long> {

    Authority findByAuthorityType(AuthorityType authorityType);

}
