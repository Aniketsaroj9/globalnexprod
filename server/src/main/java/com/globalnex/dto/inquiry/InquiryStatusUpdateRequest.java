package com.globalnex.dto.inquiry;

import com.globalnex.model.enums.InquiryStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InquiryStatusUpdateRequest {

    @NotNull(message = "Status is required")
    private InquiryStatus status;
}
