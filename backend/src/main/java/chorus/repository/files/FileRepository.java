package chorus.repository.files;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import chorus.domain.db.node.files.File;

public interface FileRepository extends Neo4jRepository<File, Long> {

}
