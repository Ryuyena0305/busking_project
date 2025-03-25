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

    // 엑셀 데이터를 데이터베이스에 삽입
    public void insertExcelData(List<PostExcelDto> dataList) {
        for (PostExcelDto data : dataList) {
            postExcelMapper.insertPostExcelData(data);  // 매퍼 호출하여 삽입
        }
    }
}
