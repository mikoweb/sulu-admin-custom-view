<?php

namespace App\Core\Infrastructure\Sulu;

use Doctrine\ORM\EntityManager;
use Sulu\Bundle\SecurityBundle\AccessControl\AccessControlQueryEnhancer;
use Sulu\Component\Rest\ListBuilder\Doctrine\DoctrineListBuilderFactoryInterface;
use Sulu\Component\Rest\ListBuilder\Filter\FilterTypeRegistry;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

readonly class DoctrineListBuilderFactory implements DoctrineListBuilderFactoryInterface
{
    public function __construct(
        private EntityManager $em,
        private FilterTypeRegistry $filterTypeRegistry,
        private EventDispatcherInterface $eventDispatcher,
        /**
         * @var array<string, int>
         */
        private array $permissions,
        private AccessControlQueryEnhancer $accessControlQueryEnhancer
    ) {
    }

    /**
     * @param string $entityName
     */
    public function create($entityName): UuidDoctrineListBuilder
    {
        return new UuidDoctrineListBuilder(
            $this->em,
            // @phpstan-ignore-next-line
            $entityName,
            $this->filterTypeRegistry,
            $this->eventDispatcher,
            $this->permissions,
            $this->accessControlQueryEnhancer
        );
    }
}
