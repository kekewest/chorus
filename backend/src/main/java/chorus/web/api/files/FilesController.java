package chorus.web.api.files;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import chorus.domain.db.entity.contents.Area;
import chorus.repository.security.AreaAccessAuthorityRepository;
import chorus.service.contents.AreaService;
import chorus.service.contents.SheetService;
import chorus.web.api.files.response.AllAreas;

@RestController
@Validated
@RequestMapping("/api/files")
@PreAuthorize("isAuthenticated()")
public class FilesController {

    @Autowired
    private AreaAccessAuthorityRepository areaAccessAuthorityRepository;

    @Autowired
    private SheetService sheetService;

    @Autowired
    private AreaService areaService;

    @GetMapping("/all-areas")
    public AllAreas getAllAreas(Authentication authentication) {
        List<Area> areas = areaService.getAllArea(authentication);

        return new AllAreas(areas);
    }
//
//    @GetMapping("/ls")
//    public Ls ls(Authentication authentication,
//            @RequestParam @NotEmpty String areaname,
//            @RequestParam @NotNull String path) {
//        ArrayList<String> dirNameChain = new ArrayList<>(Arrays.asList(StringUtils.split(path, "/")));
//        dirNameChain.removeIf((dirname) -> {
//            return dirname.equals("");
//        });
//        dirNameChain.add(0, Directory.ROOT_NAME);
//
//        Directory dir = filesService.getDirectoryByPath(authentication.getName(), areaname, dirNameChain);
//
//        Ls ls = new Ls();
//        if (dir.getDirs() != null) {
//            dir.getDirs().forEach((d) -> ls.getChildNodes().add(Node.fromDirectory(d)));
//        }
//        if (dir.getFiles() != null) {
//            dir.getFiles().forEach((f) -> ls.getChildNodes().add(Node.fromFile(f)));
//        }
//        ls.setCurrentNode(Node.fromDirectory(dir));
//
//        return ls;
//    }
//
//    @PutMapping("/new/spread-sheet")
//    public NewNode newSpreadSheet(Authentication authentication,
//            @RequestParam @NotEmpty String areaname,
//            @RequestParam @NotEmpty String nodeId,
//            @RequestParam @NotEmpty String filename,
//            @RequestBody String fileBody) throws IOException {
//        File newFile = filesService.createFile(authentication.getName(), areaname, nodeId, filename, fileBody);
//        return NewNode.builder().newNode(Node.fromFile(newFile)).build();
//    }
//
//    @PutMapping("/new/directory")
//    public NewNode newDirectory(Authentication authentication,
//            @RequestParam @NotEmpty String areaname,
//            @RequestParam @NotEmpty String nodeId,
//            @RequestParam @NotEmpty String dirname) throws IOException {
//        Directory newDir = filesService.createDirectory(authentication.getName(), areaname, nodeId, dirname);
//        return NewNode.builder().newNode(Node.fromDirectory(newDir)).build();
//    }

}
