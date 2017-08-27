package chorus.repository.config;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import chorus.domain.db.node.config.ChorusVersion;

public interface ChorusVersionRepository extends Neo4jRepository<ChorusVersion, Long> {

}
