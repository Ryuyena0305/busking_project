package busking.admin.timetable.service;

import busking.admin.timetable.model.dto.PostExcelDto;
import busking.admin.timetable.model.mapper.PostExcelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostExcelService {

    @Autowired
    private PostExcelMapper postExcelMapper;

    public void insertExcelData(List<PostExcelDto> dataList) {
        System.out.println("PostExcelService.insertExcelData");
        System.out.println("dataList = " + dataList);
        for (PostExcelDto data : dataList) {
            postExcelMapper.insertPostExcelData(data);
        }
    }
}
