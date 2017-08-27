package chorus.web.api.files;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.constraints.NotNull;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chorus.domain.db.node.files.Area;
import chorus.domain.db.node.files.Directory;
import chorus.domain.db.node.files.File;
import chorus.service.files.FilesService;
import chorus.web.api.files.response.AllAreas;
import chorus.web.api.files.response.Ls;
import chorus.web.api.files.response.NewNode;
import chorus.web.api.files.response.Node;

@RestController
@Validated
@RequestMapping("/api/files")
@PreAuthorize("isAuthenticated()")
public class FilesController {

    @Autowired
    private FilesService filesService;

    @GetMapping("/all-areas")
    public AllAreas getAllAreas(Authentication authentication) {
        List<String> areaNames = filesService.getAllAreaNode(authentication.getName()).stream()
                .map(Area::getName)
                .collect(Collectors.toList());

        return new AllAreas(areaNames);
    }

    @GetMapping("/ls")
    public Ls ls(Authentication authentication,
            @RequestParam @NotEmpty String areaname,
            @RequestParam @NotNull String path) {
        ArrayList<String> dirNameChain = new ArrayList<>(Arrays.asList(StringUtils.split(path, "/")));
        dirNameChain.removeIf((dirname) -> {
            return dirname.equals("");
        });
        dirNameChain.add(0, Directory.ROOT_NAME);

        Directory dir = filesService.getDirectoryByPath(authentication.getName(), areaname, dirNameChain);

        Ls ls = new Ls();
        if (dir.getDirs() != null) {
            dir.getDirs().forEach((d) -> ls.getChildNodes().add(Node.fromDirectory(d)));
        }
        if (dir.getFiles() != null) {
            dir.getFiles().forEach((f) -> ls.getChildNodes().add(Node.fromFile(f)));
        }
        ls.setCurrentNode(Node.fromDirectory(dir));

        return ls;
    }

    @PutMapping("/new/spread-sheet")
    public NewNode newSpreadSheet(Authentication authentication,
            @RequestParam @NotEmpty String areaname,
            @RequestParam @NotEmpty String nodeId,
            @RequestParam @NotEmpty String filename,
            @RequestBody String fileBody) throws IOException {
        File newFile = filesService.createFile(authentication.getName(), areaname, nodeId, filename, fileBody);
        return NewNode.builder().newNode(Node.fromFile(newFile)).build();
    }

    @PutMapping("/new/directory")
    public NewNode newDirectory(Authentication authentication,
            @RequestParam @NotEmpty String areaname,
            @RequestParam @NotEmpty String nodeId,
            @RequestParam @NotEmpty String dirname) throws IOException {
        Directory newDir = filesService.createDirectory(authentication.getName(), areaname, nodeId, dirname);
        return NewNode.builder().newNode(Node.fromDirectory(newDir)).build();
    }

}
