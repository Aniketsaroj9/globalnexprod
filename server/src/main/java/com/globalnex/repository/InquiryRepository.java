package com.globalnex.repository;

import com.globalnex.model.Inquiry;
import com.globalnex.model.enums.InquiryStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryRepository extends MongoRepository<Inquiry, String> {
    Page<Inquiry> findByStatus(InquiryStatus status, Pageable pageable);
    Page<Inquiry> findByServiceLabel(String serviceLabel, Pageable pageable);
    Page<Inquiry> findByStatusAndServiceLabel(InquiryStatus status, String serviceLabel, Pageable pageable);
    
    @Query("{ $or: [ { 'name': { $regex: ?0, $options: 'i' } }, { 'email': { $regex: ?0, $options: 'i' } }, { 'message': { $regex: ?0, $options: 'i' } } ] }")
    Page<Inquiry> searchInquiries(String query, Pageable pageable);

    long countByStatus(InquiryStatus status);
}
