import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer = ({ studentName = "Sutio Franskusuma", studentId = "FS9666259" }) => (
    <Box className="footer" data-testid="footer">
        <Text className="studentName" data-testid="student-name">
            {studentName }
        </Text>
        <Text className="studentId" data-testid="student-id">
            {studentId}
        </Text>
    </Box>
);

export default Footer;
