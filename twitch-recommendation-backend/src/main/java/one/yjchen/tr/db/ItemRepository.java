package one.yjchen.tr.db;

import one.yjchen.tr.db.entity.ItemEntity;
import org.springframework.data.repository.ListCrudRepository;

public interface ItemRepository extends ListCrudRepository<ItemEntity, Long> {
    ItemEntity findByTwitchId(String twitchId);
}
