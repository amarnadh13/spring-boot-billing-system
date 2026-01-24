
package in.amar.billingsoftware.repository;

import in.amar.billingsoftware.entity.OrderEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {

    Optional<OrderEntity> findByOrderId(String orderId);

    List<OrderEntity> findAllByOrderByCreatedAtDesc();

    @Query("""
    SELECT SUM(o.grandTotal)
    FROM OrderEntity o
    WHERE o.createdAt BETWEEN :start AND :end
    """)
    Double sumSalesBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("""
    SELECT COUNT(o)
    FROM OrderEntity o
    WHERE o.createdAt BETWEEN :start AND :end
    """)
    Long countOrdersBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("""
    SELECT DISTINCT o FROM OrderEntity o
    LEFT JOIN FETCH o.items
    ORDER BY o.createdAt DESC
    """)
    List<OrderEntity> findRecentOrders(PageRequest pageable);
}
