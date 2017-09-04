package chorus.web.api.files.response;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import chorus.domain.db.entity.contents.Area;
import lombok.Data;

@Data
public class AllAreas implements Serializable {

    List<AreaResponse> areaResponses;

    public AllAreas(List<Area> areas) {
        this.areaResponses = new ArrayList<>();
        for (Area area : areas) {
            areaResponses.add(new AreaResponse(area));
        }
    }

}
