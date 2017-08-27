package chorus.web.api.files.response;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class AllAreas implements Serializable {

    List<String> areas;

}
