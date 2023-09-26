import {Box, Skeleton} from '@mui/material'

export function ProductsSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 3,
        justifySelf: 'center',
      }}
    >
      <Skeleton height={300} variant="rectangular" width={200} />
      <Skeleton height={20} variant="rounded" width={180} />
      <Skeleton height={10} variant="rounded" width={150} />
    </Box>
  )
}
