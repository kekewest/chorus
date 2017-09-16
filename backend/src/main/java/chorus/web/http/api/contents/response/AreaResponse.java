package chorus.web.http.api.contents.response;

import java.io.Serializable;

import chorus.domain.db.entity.contents.Area;
import lombok.Data;

@Data
public class AreaResponse implements Serializable {

    private String name;

    public AreaResponse(Area area) {
        this.name = area.getName();
    }

}
