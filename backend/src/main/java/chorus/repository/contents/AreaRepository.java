package chorus.repository.contents;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import chorus.domain.db.entity.contents.Area;

public interface AreaRepository extends JpaRepository<Area, String> {

    @Query("select a from Area a "
            + "inner join a.authorities auth "
            + "where auth.userName = :userName")
    public List<Area> findAllowedAreas(@Param("userName") String userName);

}
