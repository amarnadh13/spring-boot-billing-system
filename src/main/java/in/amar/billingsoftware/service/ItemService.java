package in.amar.billingsoftware.service;

import in.amar.billingsoftware.io.ItemRequest;
import in.amar.billingsoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse>fetchItems();

    void delete(String itemId);
}
