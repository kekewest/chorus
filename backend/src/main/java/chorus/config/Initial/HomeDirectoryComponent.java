package chorus.config.Initial;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import chorus.config.properties.ChorusProperties;

@Slf4j
@Component
public class HomeDirectoryComponent {

    @Autowired
    private ChorusProperties chorusProperties;

    private String fileDir;

    public void init() {
        fileDir = chorusProperties.getHomeDir() + "/files/";
        checkHomeDirectoryExistence();
    }

    private void checkHomeDirectoryExistence() {
        File homeDirectory = new File(chorusProperties.getHomeDir());
        if (!homeDirectory.exists()) {
            try {
                homeDirectory.mkdirs();
                log.info("create home directory. (" + homeDirectory.getAbsolutePath() + ")");
            } catch (Exception e) {
                log.error("create home directory failed.", e);
                throw e;
            }
        }

        File filesDirectory = new File(fileDir);
        if (!filesDirectory.exists()) {
            try {
                filesDirectory.mkdirs();
                log.info("create spreadsheet directory. (" + filesDirectory.getAbsolutePath() + ")");
            } catch (Exception e) {
                log.error("create spreadsheet directory failed.", e);
                throw e;
            }
        }
    }

    public String getFile(String nodeId) throws IOException {
        File file = new File(fileDir + "/" + nodeId);
        return FileUtils.readFileToString(file, StandardCharsets.UTF_8);
    }

    public void updateFile(String nodeId, String fileBody) throws IOException {
        File file = new File(fileDir + "/" + nodeId);
        FileUtils.write(file, fileBody, StandardCharsets.UTF_8);
    }

    public void removeFile(String nodeId) throws IOException {
        File file = new File(fileDir + "/" + nodeId);
        Files.delete(file.toPath());
    }

}
