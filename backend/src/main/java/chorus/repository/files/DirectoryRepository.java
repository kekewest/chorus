package chorus.repository.files;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.repository.query.Param;

import chorus.domain.db.node.files.Directory;

public interface DirectoryRepository extends Neo4jRepository<Directory, String> {

    @Query("MATCH (:User {name:{username}})-[:Member]->(:Area {name:{areaname}})-[:Ownership*]->(dir:Directory {nodeId:{nodeId}}) RETURN dir")
    Directory getDirectoryByNodeId(@Param("username") String username, @Param("areaname") String areaname, @Param("nodeId") String dirId);

}
